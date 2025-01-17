# Create your views here.
from web.celery import app
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from projects.models import Project
from scans.models import *
import validators
from scans.tasks import *
from editprofile.imgUser import imgUser
import base64
from ast import literal_eval
from json import loads
from rest_framework import status


from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *


# @login_required(login_url='/login/')
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request, number):


    imagePath = imgUser(request.user.id)

    target = Project.objects.get(id=number)
    scan_subdomains = SubdomainsDNS.objects.all()

    context = {
        "imagePath": imagePath,
        "title_domain_target": str(target).upper(),
        "domain_target": str(target),
        "scan_subdomains": scan_subdomains,
	    "status":target.status, 
    }
    
    command = str(target.command).split("'")
    del command[0::2]

    type_scan = command[3]


    if type_scan == '-r': # RECON
        domain_info_general = DomainInfoGeneral.objects.filter(project_id=number).last()
        context['domain_info_general'] = [] if domain_info_general == None else domain_info_general.domain_info_general.splitlines()
        # context['domain_info_email'] = DomainInfoEmail.objects.filter(project_id=number).last()
        # context['domain_info_ip'] = DomainInfoIP.objects.filter(project_id=number).last()
        context['domain_info_name'] = DomainInfoName.objects.filter(project_id=number).last()
        context['osintusersinfo'] = OSINTUsersInfo.objects.filter(project_id=number)
        metadatas = MetadataResults.objects.filter(project_id=number).last()
        context['metadata_results'] = [] if metadatas == None else metadatas.metadata_results.splitlines()
        emails = Emails.objects.filter(project_id=number).last()
        context['emails'] = [] if emails == None else emails.emails.splitlines()
        context['google_dorks'] = Dorks.objects.filter(project_id=number).last()
        git_dorks = GitDorks.objects.filter(project_id=number).last()
        context['git_dorks'] = [] if git_dorks == None else git_dorks.git_dorks.splitlines()
        software_infos = SoftwareInfo.objects.filter(project_id=number).last()
        context['software_infos'] = "" if software_infos == None else software_infos.software_info
        context['software_infos_count'] = len(context['software_infos'].splitlines())
        context['metadata_results_count'] = 0 
        context['domain_info_general_count'] = 0
        context['google_dorks_count'] = 0
        context['git_dorks_count'] = 0
        context['osintusersinfouser_count'] = 0
        context['osintusersinfopassword_count'] = 0

        for line in context['git_dorks']:
            if "Too many errors, auto stop" not in git_dorks.git_dorks:
                if line != "" and str(context['title_domain_target']).lower() in line.lower():
                    context['git_dorks_count'] += 1

        for line in [] if context['google_dorks'] == None else context['google_dorks'].dorks.splitlines():
            if line != "":
                if "http" in line and line[0] != "#":
                    context['google_dorks_count'] += 1

        for line in context['metadata_results']:
            if "URL: " in line:
                context['metadata_results_count'] += 1

        for info in context['domain_info_general']:
            if info != "":
                if info[0] != "%" and info[0] != ";":
                    context['domain_info_general_count'] += 1

        for info in context['osintusersinfo']:
            if info.users != "":
                context['osintusersinfouser_count'] += 1
            if info.passwords != "":
                context['osintusersinfopassword_count'] += 1

        context['authors_infos'] = AuthorsInfo.objects.filter(project_id=number).last()
        context['zonetransfer'] = Zonetransfer.objects.filter(project_id=number).last()
        context['favicontest'] = Favicontest.objects.filter(project_id=number).last()
        context['subdomains_dns'] = SubdomainsDNS.objects.filter(project_id=number).order_by('host')
        context['subdomains'] = Subdomains.objects.filter(project_id=number).last()
        context['s3buckets'] = S3Buckets.objects.filter(project_id=number).last()
        context['cloud_assets'] = CloudAssets.objects.filter(project_id=number)
        context['web_probes'] = WebProbes.objects.filter(project_id=number).last()
        context['web_uncommon_ports'] = WebsUncommonPorts.objects.filter(project_id=number).last()
        context['screenshots'] = screenshots_context(number)
        context['portscan_active'] = PortscanActive.objects.filter(project_id=number).last()
        context['portscan_passive'] = PortscanPassive.objects.filter(project_id=number).last()
        context['cdn_providers'] = CDNProviders.objects.filter(project_id=number).last()
        context['web_wafs'] = WebWafs.objects.filter(project_id=number).last()
        nuclei_outputs = NucleiOutputs.objects.filter(project_id=number).only('info', 'low', 'medium', 'high', 'critical').last()
        context['nuclei_outputs_info'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.info else literal_eval(nuclei_outputs.info)
        context['nuclei_outputs_low'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.low else literal_eval(nuclei_outputs.low)
        context['nuclei_outputs_medium'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.medium else literal_eval(nuclei_outputs.medium)
        context['nuclei_outputs_high'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.high else literal_eval(nuclei_outputs.high)
        context['nuclei_outputs_critical'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.critical else literal_eval(nuclei_outputs.critical)
        # fuzzing_paths = FuzzingFull.objects.filter(project_id=number).values('fuzzing_full').last()
        # context['fuzzing_full'] = [['N/A']*3] if fuzzing_paths == None or 'N/A' in fuzzing_paths.fuzzing_full else literal_eval(fuzzing_paths.fuzzing_full)
        context['url_extract'] = URLExtract.objects.filter(project_id=number).last()
        context['url_gf'] = URLgf.objects.filter(project_id=number).last()
        jschecks = JSChecks.objects.filter(project_id=number).last()
        context['js_checks_livelinks'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.js_livelinks else literal_eval(jschecks.js_livelinks)
        context['js_checks_url_extract_js'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.url_extract_js else literal_eval(jschecks.url_extract_js)
        context['js_checks_js_endpoints'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.js_endpoints else literal_eval(jschecks.js_endpoints)
        context['js_checks_js_secrets'] = [['N/A']*5] if jschecks == None or 'N/A' in jschecks.js_secrets else literal_eval(jschecks.js_secrets)
        web_dicts = WebDicts.objects.filter(project_id=number).only('dict_params', 'dict_values', 'dict_words', 'all_paths', 'password_dict').last()
        context['web_dicts_params'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_params else literal_eval(web_dicts.dict_params)
        context['web_dicts_values'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_values else literal_eval(web_dicts.dict_values)
        context['web_dicts_words'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_words else literal_eval(web_dicts.dict_words)
        context['web_dicts_paths'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.all_paths else literal_eval(web_dicts.all_paths)
        context['web_dicts_passwords'] = 'N/A' if web_dicts == None or 'N/A' in web_dicts.password_dict else web_dicts.password_dict.splitlines()
        context['cms_scanners'] = CMS.objects.filter(project_id=number)
        context['subdomains_table'] = subdomains_context(project_id=number)
        

        zoneTransferSerilaized = ZoneTransferSerializer(context['zonetransfer'])
        subdomainsDns = SubdomainsDNSSerializer(context['subdomains_dns'], many=True)

        recon_data = {
            'subdomains_table' : context['subdomains_table'],
            'dns_zone_transfers' : zoneTransferSerilaized.data,
            'dns_registry' : subdomainsDns.data,
            'cloud_assets' : CloudAssetsSerializer(context['cloud_assets'], many=True).data,
            'screenshots' : context['screenshots'],
            'nuclei' : {
                'nuclei_outputs_info': context['nuclei_outputs_info'],
                'nuclei_outputs_low': context['nuclei_outputs_low'],
                'nuclei_outputs_medium': context['nuclei_outputs_medium'],
                'nuclei_outputs_high': context['nuclei_outputs_high'],
                'nuclei_outputs_critical': context['nuclei_outputs_critical'],
            },
            'javascript' : {
                'live_links' : context['js_checks_livelinks'],
                'url_extracts': context['js_checks_url_extract_js'],
                'endpoints': context['js_checks_js_endpoints'],
                'secrets' : context['js_checks_js_secrets']
                },
            'dictionaries' : {
            'params': context['web_dicts_params'],
            'values' : context['web_dicts_values'] ,
            'words' : context['web_dicts_words'] ,
            'paths' : context['web_dicts_paths'] ,
            'passwords' :  context['web_dicts_passwords'],
            }
        }

        return Response(recon_data)


    elif type_scan == '-s': # SUBDOMAINS
        context['subdomains_dns'] = SubdomainsDNS.objects.filter(project_id=number).order_by('host')
        context['subdomains'] = Subdomains.objects.filter(project_id=number).last()
        context['s3buckets'] = S3Buckets.objects.filter(project_id=number).last()
        context['cloud_assets'] = CloudAssets.objects.filter(project_id=number)
        context['zonetransfer'] = Zonetransfer.objects.filter(project_id=number).last()
        context['subdomain_takeover'] = SubTakeover.objects.filter(project_id=number).last()
        context['web_probes'] = WebProbes.objects.filter(project_id=number).last()
        context['web_uncommon_ports'] = WebsUncommonPorts.objects.filter(project_id=number)
        context['screenshots'] = screenshots_context(number)
        context['subdomains_table'] = subdomains_context(project_id=number)



        zoneTransferSerilaized =  ZoneTransferSerializer(context['zonetransfer']) if context['zonetransfer'] else ''
        subdomainsDns = SubdomainsDNSSerializer(context['subdomains_dns'], many=True)
        webProbesSerialized = WebProbesSerializer(context['web_probes'])
        websUncommonPortsSerialized = WebsUncommonPortsSerializer(context['web_uncommon_ports'])


        subdomains_data = {
            'subdomains_table' : context['subdomains_table'],
            # 'dns_zone_transfers' : zoneTransferSerilaized.data if zoneTransferSerilaized.data else '' ,
            'dns_registry' : subdomainsDns.data,
            'screenshots' : context['screenshots'],
            'web_probes' : webProbesSerialized.data,
            'web_uncommon_ports' : websUncommonPortsSerialized.data
        }
        return Response(subdomains_data)

    elif type_scan == '-p': # PASSIVE
        context['domain_info_email'] = DomainInfoEmail.objects.filter(project_id=number).last()
        domain_info_general = DomainInfoGeneral.objects.filter(project_id=number).last()
        context['domain_info_general'] = [] if domain_info_general == None else domain_info_general.domain_info_general.splitlines()
        context['domain_info_ip'] = DomainInfoIP.objects.filter(project_id=number).last()
        context['domain_info_name'] = DomainInfoName.objects.filter(project_id=number).last()
        emails = Emails.objects.filter(project_id=number).last()
        context['emails'] = [] if emails == None else emails.emails.splitlines()
        context['google_dorks'] = Dorks.objects.filter(project_id=number).last()
        git_dorks = GitDorks.objects.filter(project_id=number).last()
        context['git_dorks'] = [] if git_dorks == None else git_dorks.git_dorks.splitlines()
        software_infos = SoftwareInfo.objects.filter(project_id=number).last()
        context['software_infos'] = "" if software_infos == None else software_infos.software_info
        context['authors_infos'] = AuthorsInfo.objects.filter(project_id=number).last()
        metadatas = MetadataResults.objects.filter(project_id=number).last()
        context['metadata_results'] = [] if metadatas == None else metadatas.metadata_results.splitlines()
        context['favicontest'] = Favicontest.objects.filter(project_id=number).last()
        context['subdomains_dns'] = SubdomainsDNS.objects.filter(project_id=number)
        context['subdomains'] = Subdomains.objects.filter(project_id=number).last()
        context['portscan_passive'] = PortscanPassive.objects.filter(project_id=number).last()
        cdn_providers = CDNProviders.objects.filter(project_id=number).last()
        context['cdn_providers'] = [] if cdn_providers == None else cdn_providers.cdn_providers.splitlines()
        context['osintusersinfo'] = OSINTUsersInfo.objects.filter(project_id=number)
        context['software_infos_count'] = len(context['software_infos'].splitlines())
        context['metadata_results_count'] = 0 
        context['domain_info_general_count'] = 0
        context['google_dorks_count'] = 0
        context['git_dorks_count'] = 0
        context['osintusersinfouser_count'] = 0
        context['osintusersinfopassword_count'] = 0

        for line in context['git_dorks']:
            if "Too many errors, auto stop" not in git_dorks.git_dorks:
                if line != "" and str(context['title_domain_target']).lower() in line.lower():
                    context['git_dorks_count'] += 1

        for line in [] if context['google_dorks'] == None else context['google_dorks'].dorks.splitlines():
            if line != "":
                if "http" in line and line[0] != "#":
                    context['google_dorks_count'] += 1

        for line in context['metadata_results']:
            if "URL: " in line:
                context['metadata_results_count'] += 1

        for info in context['domain_info_general']:
            if info != "":
                if info[0] != "%" and info[0] != ";":
                    context['domain_info_general_count'] += 1

        for info in context['osintusersinfo']:
            if info.users != "":
                context['osintusersinfouser_count'] += 1
            if info.passwords != "":
                context['osintusersinfopassword_count'] += 1
        context['subdomains_table'] = subdomains_context(project_id=number)

        passive_data = {
            'subdomains_table' : context['subdomains_table'],
            'dns_zone_transfers' : zoneTransferSerilaized.data,
            'dns_registry' : subdomainsDns.data,
            'screenshots' : context['screenshots'],
            'osint_resources': [
            {
                'id': 'googleDorks',
                'title': 'Google Dorks',
                'count': context['google_dorks_count'],
                'google_dorks': context['google_dorks']
            },
            {
                'id': 'githubDorks',
                'title': 'Github Dorks',
                'count': context['git_dorks_count'],
                'data': context['git_dorks'],
            },
            {
                'id': 'softwares',
                'title': 'Softwares Used',
                'count': context['software_infos_count'],
                'data': context['software_infos'],
            },
            {
                'id': 'users',
                'title': 'Users Related',
                'count': context['osintusersinfouser_count'],
                'data': OSINTUsersInfoSerializer(context['osintusersinfo'], many=True).data
            },
            {
                'id': 'metadata',
                'title': 'Metadata Results',
                'count': context['metadata_results_count'],
                'data': context['metadata_results']
            },
            {
                'id': 'emails',
                'title': 'Emails Found',
                'count': len(context['emails']),
                'data': context['emails']
            },
            {
                'id': 'passwords',
                'title': 'Passwords Found',
                'count': context['osintusersinfopassword_count'],
                'data': OSINTUsersInfoSerializer(context['osintusersinfo'], many=True).data
            },
            {
                'id': 'domain',
                'title': 'Domain Info',
                'count': context['domain_info_general_count'],
                'data' : context['domain_info_general']
            }
        ],
            
        }

        return Response(passive_data)



        # return render(request, "scans_passive.html", context)

    elif type_scan == '-w': # WEB
        context['s3buckets'] = S3Buckets.objects.filter(project_id=number).last()
        context['cloud_assets'] = CloudAssets.objects.filter(project_id=number)
        context['subdomain_takeover'] = SubTakeover.objects.filter(project_id=number).last()
        context['web_wafs'] = WebWafs.objects.filter(project_id=number).last()
        nuclei_outputs = NucleiOutputs.objects.filter(project_id=number).only('info', 'low', 'medium', 'high', 'critical').last()
        context['nuclei_outputs_info'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.info else literal_eval(nuclei_outputs.info)
        context['nuclei_outputs_low'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.low else literal_eval(nuclei_outputs.low)
        context['nuclei_outputs_medium'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.medium else literal_eval(nuclei_outputs.medium)
        context['nuclei_outputs_high'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.high else literal_eval(nuclei_outputs.high)
        context['nuclei_outputs_critical'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.critical else literal_eval(nuclei_outputs.critical)
        context['cms_scanners'] = CMS.objects.filter(project_id=number)
        # fuzzing_paths = FuzzingFull.objects.filter(project_id=number).values('fuzzing_full').last()
        # context['fuzzing_full'] = [['N/A']*3] if fuzzing_paths == None or 'N/A' in fuzzing_paths.fuzzing_full else literal_eval(fuzzing_paths.fuzzing_full)
        context['url_extract'] = URLExtract.objects.filter(project_id=number).values("url_extract").last()
        context['url_gf'] = URLgf.objects.filter(project_id=number).last()
        jschecks = JSChecks.objects.filter(project_id=number).last()
        context['js_checks_livelinks'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.js_livelinks else literal_eval(jschecks.js_livelinks)
        context['js_checks_url_extract_js'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.url_extract_js else literal_eval(jschecks.url_extract_js)
        context['js_checks_js_endpoints'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.js_endpoints else literal_eval(jschecks.js_endpoints)
        context['js_checks_js_secrets'] = [['N/A']*5] if jschecks == None or 'N/A' in jschecks.js_secrets else literal_eval(jschecks.js_secrets)
        web_dicts = WebDicts.objects.filter(project_id=number).only('dict_params', 'dict_values', 'dict_words', 'all_paths', 'password_dict').last()
        context['web_dicts_params'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_params else literal_eval(web_dicts.dict_params)
        context['web_dicts_values'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_values else literal_eval(web_dicts.dict_values)
        context['web_dicts_words'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_words else literal_eval(web_dicts.dict_words)
        context['web_dicts_paths'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.all_paths else literal_eval(web_dicts.all_paths)
        context['web_dicts_passwords'] = 'N/A' if web_dicts == None or 'N/A' in web_dicts.password_dict else web_dicts.password_dict.splitlines()
        vulns = Vulns.objects.filter(project_id=number).last()
        context['redirect'] = ["N/A"] if vulns == None else vulns.redirect.splitlines()
        context['crlf'] = ["N/A"] if vulns == None else vulns.crlf.splitlines()
        context['xss'] = ["N/A"] if vulns == None else vulns.xss.splitlines()
        context['lfi'] = ["N/A"] if vulns == None else vulns.lfi.splitlines()
        context['ssrf'] = ["N/A"] if vulns == None else vulns.ssrf_requested_url.splitlines()
        context['ssti'] = ["N/A"] if vulns == None else vulns.ssti.splitlines()
        context['cors'] = ["N/A"] if vulns == None else loads(vulns.cors)
        context['command_injection'] = ["N/A"] if vulns == None else vulns.command_injection.splitlines()
        smuggling = {} if vulns == None else loads(vulns.smuggling)
        context['smuggling_Method'] = smuggling['method'] if "method" in smuggling else "N/A"
        context['smuggling_Endpoint'] = smuggling['endpoint'] if "endpoint" in smuggling else "N/A"
        context['smuggling_Cookies'] = smuggling['cookies'] if "cookies" in smuggling else "N/A"
        if "method" in smuggling: smuggling.pop("method")
        if "endpoint" in smuggling: smuggling.pop("endpoint")
        if "cookies" in smuggling: smuggling.pop("cookies")
        context['smuggling'] = [2*"N/A"] if vulns == None else smuggling
        context['brokenlinks'] = ["N/A"] if vulns == None else literal_eval(vulns.brokenlinks)


        cmsSerialized = CMSSerializer(context['cms_scanners'], many=True)

        web_data = {
        'CMS': cmsSerialized.data,
        'cloud_assets' : CloudAssetsSerializer(context['cloud_assets'], many=True).data,

        'nuclei' : {
            'nuclei_outputs_info': context['nuclei_outputs_info'],
            'nuclei_outputs_low': context['nuclei_outputs_low'],
            'nuclei_outputs_medium': context['nuclei_outputs_medium'],
            'nuclei_outputs_high': context['nuclei_outputs_high'],
            'nuclei_outputs_critical': context['nuclei_outputs_critical'],
            },
        'vulnerabilities' : {
            'cors' : context['cors'],
            'broken_links' : context['brokenlinks'],
            'smuggling' : context['smuggling'],
            'crlf' : context['crlf'],
            'open_redirect': context['redirect'],
            'command_injection': context['command_injection'],
            'ssrf': context['ssrf'],
            'xss': context['xss'],
            'lfi': context['lfi'],
            'ssti': context['ssti'],
        },
        'javascript' : {
            'live_links' : context['js_checks_livelinks'],
            'url_extracts': context['js_checks_url_extract_js'],
            'endpoints': context['js_checks_js_endpoints'],
            'secrets' : context['js_checks_js_secrets']
        },
        'dictionaries' : {
            'params': context['web_dicts_params'],
            'values' : context['web_dicts_values'] ,
            'words' : context['web_dicts_words'] ,
            'paths' : context['web_dicts_paths'] ,
            'passwords' :  context['web_dicts_passwords'],
            }

        } 

        return Response(web_data)


        # return render(request, "scans_web.html", context)

    elif type_scan == '-n': # OSINT
        context['domain_info_email'] = DomainInfoEmail.objects.filter(project_id=number).last()
        context['domain_info_general'] = DomainInfoGeneral.objects.filter(project_id=number).last()
        context['domain_info_ip'] = DomainInfoIP.objects.filter(project_id=number).last()
        context['domain_info_name'] = DomainInfoName.objects.filter(project_id=number).last()
        context['ips_infos'] = IPsInfos.objects.filter(project_id=number).last()
        context['emails'] = Emails.objects.filter(project_id=number).last()
        context['google_dorks'] = Dorks.objects.filter(project_id=number).last()
        context['git_dorks'] = GitDorks.objects.filter(project_id=number).last()
        metadatas = MetadataResults.objects.filter(project_id=number).last()
        context['metadata_results'] = [] if metadatas == None else metadatas.metadata_results.splitlines()
        context['zonetransfer'] = Zonetransfer.objects.filter(project_id=number).last()
        context['favicontest'] = Favicontest.objects.filter(project_id=number).last()
        
        osint_data = {
            'dns_zone_transfers' : zoneTransferSerilaized.data,
            'metadata_results' :  context['metadata_results'],
            'emails' : context['emails']
        }
        return Response(osint_data)
        # return render(request, "scans_osint.html", context)

    elif type_scan == '-a': # ALL
        domain_info_general = DomainInfoGeneral.objects.filter(project_id=number).last()
        software_infos = SoftwareInfo.objects.filter(project_id=number).last()
        emails = Emails.objects.filter(project_id=number).last()
        metadatas = MetadataResults.objects.filter(project_id=number).last()
        git_dorks = GitDorks.objects.filter(project_id=number).last()
        vulns = Vulns.objects.filter(project_id=number).last()
        #not in use # context['domain_info_email'] = DomainInfoEmail.objects.filter(project_id=number).last()
        context['domain_info_general'] = [] if domain_info_general == None else domain_info_general.domain_info_general.splitlines()
        #not in use # context['domain_info_ip'] = DomainInfoIP.objects.filter(project_id=number).last()
        context['osintusersinfo'] = OSINTUsersInfo.objects.filter(project_id=number)
        context['domain_info_name'] = DomainInfoName.objects.filter(project_id=number).last()
        context['emails'] = [] if emails == None else emails.emails.splitlines()
        context['google_dorks'] = Dorks.objects.filter(project_id=number).last()
        context['git_dorks'] = [] if git_dorks == None else git_dorks.git_dorks.splitlines()
        context['software_infos'] = "" if software_infos == None else software_infos.software_info
        context['authors_infos'] = AuthorsInfo.objects.filter(project_id=number).last()
        context['metadata_results'] = [] if metadatas == None else metadatas.metadata_results.splitlines()
        context['zonetransfer'] = Zonetransfer.objects.filter(project_id=number).last()
        #not in use # context['favicontest'] = Favicontest.objects.filter(project_id=number).last()
        context['subdomains_dns'] = SubdomainsDNS.objects.filter(project_id=number).order_by('host')
        context['subdomains'] = Subdomains.objects.filter(project_id=number).last()
        context['s3buckets'] = S3Buckets.objects.filter(project_id=number).last()
        context['cloud_assets'] = CloudAssets.objects.filter(project_id=number)
        #not in use # context['web_probes'] = WebProbes.objects.filter(project_id=number).last()
        context['redirect'] = ["N/A"] if vulns == None else vulns.redirect.splitlines()
        context['crlf'] = ["N/A"] if vulns == None else vulns.crlf.splitlines()
        context['xss'] = ["N/A"] if vulns == None else vulns.xss.splitlines()
        context['lfi'] = ["N/A"] if vulns == None else vulns.lfi.splitlines()
        context['ssrf'] = ["N/A"] if vulns == None else vulns.ssrf_requested_url.splitlines()
        context['ssti'] = ["N/A"] if vulns == None else vulns.ssti.splitlines()
        if vulns is not None and vulns.cors:
            try:
                context['cors'] = ["N/A"] if vulns == None else loads(vulns.cors)
            except (ValueError, SyntaxError):
                context['cors'] = ["N/A"]
        else:
            context['cors'] = ["N/A"]
        context['command_injection'] = ["N/A"] if vulns == None else vulns.command_injection.splitlines()
        smuggling = {} if vulns == None else loads(vulns.smuggling)
        context['smuggling_Method'] = smuggling['method'] if "method" in smuggling else "N/A"
        context['smuggling_Endpoint'] = smuggling['endpoint'] if "endpoint" in smuggling else "N/A"
        context['smuggling_Cookies'] = smuggling['cookies'] if "cookies" in smuggling else "N/A"
        if "method" in smuggling: smuggling.pop("method")
        if "endpoint" in smuggling: smuggling.pop("endpoint")
        if "cookies" in smuggling: smuggling.pop("cookies")
        context['smuggling'] = [2*"N/A"] if vulns == None else smuggling
        # context['brokenlinks'] = ["N/A"] if vulns == None else literal_eval(vulns.brokenlinks)
        if vulns is not None and vulns.brokenlinks:
            try:
                context['brokenlinks'] = literal_eval(vulns.brokenlinks)
            except (ValueError, SyntaxError):
                context['brokenlinks'] = ["N/A"]
        else:
            context['brokenlinks'] = ["N/A"]
        context['software_infos_count'] = len(context['software_infos'].splitlines())
        context['metadata_results_count'] = 0 
        context['domain_info_general_count'] = 0
        context['google_dorks_count'] = 0
        context['git_dorks_count'] = 0
        context['osintusersinfouser_count'] = 0
        context['osintusersinfopassword_count'] = 0

        for line in context['git_dorks']:
            if "Too many errors, auto stop" not in git_dorks.git_dorks:
                if line != "" and str(context['title_domain_target']).lower() in line.lower():
                    context['git_dorks_count'] += 1

        for line in [] if context['google_dorks'] == None else context['google_dorks'].dorks.splitlines():
            if line != "":
                if "http" in line and line[0] != "#":
                    context['google_dorks_count'] += 1

        for line in context['metadata_results']:
            if "URL: " in line:
                context['metadata_results_count'] += 1

        for info in context['domain_info_general']:
            if info != "":
                if info[0] != "%" and info[0] != ";":
                    context['domain_info_general_count'] += 1

        for info in context['osintusersinfo']:
            if info.users != "":
                context['osintusersinfouser_count'] += 1
            if info.passwords != "":
                context['osintusersinfopassword_count'] += 1

        context['screenshots'] = screenshots_context(number)
        context['portscan_active'] = PortscanActive.objects.filter(project_id=number).last()
        context['portscan_passive'] = PortscanPassive.objects.filter(project_id=number).last()
        context['cdn_providers'] = CDNProviders.objects.filter(project_id=number).last()
        context['web_wafs'] = WebWafs.objects.filter(project_id=number).last()
        nuclei_outputs = NucleiOutputs.objects.filter(project_id=number).only('info', 'low', 'medium', 'high', 'critical').last()
        context['nuclei_outputs_info'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.info else literal_eval(nuclei_outputs.info)
        context['nuclei_outputs_low'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.low else literal_eval(nuclei_outputs.low)
        context['nuclei_outputs_medium'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.medium else literal_eval(nuclei_outputs.medium)
        context['nuclei_outputs_high'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.high else literal_eval(nuclei_outputs.high)
        context['nuclei_outputs_critical'] = [['N/A']*5] if nuclei_outputs == None or 'N/A' in nuclei_outputs.critical else literal_eval(nuclei_outputs.critical)
        # fuzzing_paths = FuzzingFull.objects.filter(project_id=number).values('fuzzing_full').last()
        #context['fuzzing_full'] = [['N/A']*3] if fuzzing_paths == None or 'N/A' in fuzzing_paths.fuzzing_full else literal_eval(fuzzing_paths.fuzzing_full)
        context['url_extract'] = URLExtract.objects.filter(project_id=number).values("url_extract").last()
        #context['url_gf'] = URLgf.objects.filter(project_id=number).last()
        jschecks = JSChecks.objects.filter(project_id=number).last()
        context['js_checks_livelinks'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.js_livelinks else literal_eval(jschecks.js_livelinks)
        context['js_checks_url_extract_js'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.url_extract_js else literal_eval(jschecks.url_extract_js)
        context['js_checks_js_endpoints'] = ['N/A'] if jschecks == None or 'N/A' in jschecks.js_endpoints else literal_eval(jschecks.js_endpoints)
        context['js_checks_js_secrets'] = [['N/A']*5] if jschecks == None or 'N/A' in jschecks.js_secrets else literal_eval(jschecks.js_secrets)
        web_dicts = WebDicts.objects.filter(project_id=number).only('dict_params', 'dict_values', 'dict_words', 'all_paths', 'password_dict').last()
        context['web_dicts_params'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_params else literal_eval(web_dicts.dict_params)
        context['web_dicts_values'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_values else literal_eval(web_dicts.dict_values)
        context['web_dicts_words'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.dict_words else literal_eval(web_dicts.dict_words)
        context['web_dicts_paths'] = ['N/A'] if web_dicts == None or 'N/A' in web_dicts.all_paths else literal_eval(web_dicts.all_paths)
        context['web_dicts_passwords'] = 'N/A' if web_dicts == None or 'N/A' in web_dicts.password_dict else web_dicts.password_dict.splitlines()             
        context['cms_scanners'] = CMS.objects.filter(project_id=number)
        context['subdomains_table'] = subdomains_context(project_id=number)
        # return render(request, "scans.html", context)

    # return render(request, "scans.html", context)

    zoneTransferSerilaized = ZoneTransferSerializer(context['zonetransfer'])
    subdomainsDnsSerialized = SubdomainsDNSSerializer(context['subdomains_dns'], many=True)
    cmsSerialized = CMSSerializer(context['cms_scanners'], many=True)
    res_data = {
        'subdomains_table' : context['subdomains_table'],
        'dns_zone_transfers' : zoneTransferSerilaized.data,
        'dns_registry' : subdomainsDnsSerialized.data,
        'cloud_assets' : CloudAssetsSerializer(context['cloud_assets'], many=True).data,
        'screenshots' : context['screenshots'],
        'CMS': cmsSerialized.data,
        'portscan_active' : PortscanActiveSerializer(context['portscan_active']).data,
        'portscan_passive' : PortscanActiveSerializer(context['portscan_passive']).data,
 
         'osint_resources': [
            {
                'id': 'googleDorks',
                'title': 'Google Dorks',
                'count': context['google_dorks_count'],
                'data': DorksSerializer(context['google_dorks']).data['dorks']
            },
            {
                'id': 'githubDorks',
                'title': 'Github Dorks',
                'count': context['git_dorks_count'],
                'data': context['git_dorks'],
            },
            {
                'id': 'softwares',
                'title': 'Softwares Used',
                'count': context['software_infos_count'],
                'data': context['software_infos'],
            },
            {
                'id': 'users',
                'title': 'Users Related',
                'count': context['osintusersinfouser_count'],
                'data': OSINTUsersInfoSerializer(context['osintusersinfo'], many=True).data
            },
            {
                'id': 'metadata',
                'title': 'Metadata Results',
                'count': context['metadata_results_count'],
                'data': context['metadata_results']
            },
            {
                'id': 'emails',
                'title': 'Emails Found',
                'count': len(context['emails']),
                'data': context['emails']
            },
            {
                'id': 'passwords',
                'title': 'Passwords Found',
                'count': context['osintusersinfopassword_count'],
                'data': OSINTUsersInfoSerializer(context['osintusersinfo'], many=True).data
            },
            {
                'id': 'domain',
                'title': 'Domain Info',
                'count': context['domain_info_general_count'],
                'data' : context['domain_info_general']
            }
        ],
        'nuclei' : {
            'nuclei_outputs_info': context['nuclei_outputs_info'],
            'nuclei_outputs_low': context['nuclei_outputs_low'],
            'nuclei_outputs_medium': context['nuclei_outputs_medium'],
            'nuclei_outputs_high': context['nuclei_outputs_high'],
            'nuclei_outputs_critical': context['nuclei_outputs_critical'],
            },
        'vulnerabilities' : {
            'cors' : context['cors'] ,
            'broken_links' : context['brokenlinks'] ,
            'smuggling' : context['smuggling'],
            'crlf' : context['crlf'],
            'open_redirect': context['redirect'],
            'command_injection': context['command_injection'],
            'ssrf': context['ssrf'],
            'xss': context['xss'],
            'lfi': context['lfi'],
            'ssti': context['ssti'],
        },
        'javascript' : {
            'live_links' : context['js_checks_livelinks'],
            'url_extracts': context['js_checks_url_extract_js'],
            'endpoints': context['js_checks_js_endpoints'],
            'secrets' : context['js_checks_js_secrets']
        },
        'dictionaries' : {
            'params': context['web_dicts_params'],
            'values' : context['web_dicts_values'] ,
            'words' : context['web_dicts_words'] ,
            'paths' : context['web_dicts_paths'] ,
            'passwords' :  context['web_dicts_passwords'],
        }

    } 

    return Response(res_data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_scan(request):
    '''
    type_domain = 0 -> single domain scan
    type_domain = 1 -> list domain scan
    '''
    if request.method == "POST":
        type_domain = request.data['typeDomain']
        
        if type_domain == "0":
            single_domain = request.data['singleDomain']
            print("Single Domain -> " , single_domain)

            # remove protocol and www , only get the domain_name

            if validators.domain(single_domain): 
                command = ['../reconftw.sh','-d',single_domain]

                req_params = request.data
                print('req_params -> ' , req_params)
                # MODE OPTIONS
                if req_params['switch-all'] == True :
                    command.append('-a')
                elif req_params['switch-recon'] == True:
                    command.append('-r')
                elif req_params['switch-subdomains'] == True:
                    command.append('-s')
                elif req_params['switch-passive'] == True:
                    command.append('-p')
                elif req_params['switch-web'] == True:
                    command.append('-w')
                elif req_params['switch-osint'] == True:
                    command.append('-n')

                # GENERAL OPTIONS
                if req_params['switch-deep'] == True :
                        command.append('--deep')
                if req_params['switch-vps'] == True:
                        command.append('-v')
                # command.append( request.data['user_id'])


                print('Command -> ', command)
                


                # RUN new_scan_single_domain TASK
                print("=====>>>> about to run new_scan_single_domain")
                celery_task = new_scan_single_domain.delay(command, request.data['user'])

                return Response({'message': 'ok'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': "Domain Invalid"}, status=status.HTTP_400_BAD_REQUEST)

        elif type_domain == "1":
            list_domain = request.data['listDomain']
            print("List Domain1", list_domain)
            list_domain = list(map(str.strip, list_domain.split("\n")))
            print("List Domain2", list_domain)

            for single_domain in list_domain:
                if validators.domain(single_domain):
                    command = ['../reconftw.sh','-d',single_domain]

                    req_params = list(request.data)
                    
                    # MODE OPTIONS
                    if req_params[4] == 'switch-recon':
                        command.append('-r')
                    elif req_params[4] == 'switch-subdomains':
                        command.append('-s')
                    elif req_params[4] == 'switch-passive':
                        command.append('-p')
                    elif req_params[4] == 'switch-all':
                        command.append('-a')
                    elif req_params[4] == 'switch-web':
                        command.append('-w')
                    elif req_params[4] == 'switch-osint':
                        command.append('-n')

                    # GENERAL OPTIONS
                    if 'switch-deep' in req_params:
                            command.append('--deep')
                    if 'switch-vps' in req_params:
                            command.append('-v')

                    # # RUN new_scan_single_domain TASK
                    # print("=====>>>> about to run new_scan_single_domain")
                    # celery_task = new_scan_single_domain.apply_async(command, queue="default")
                    print("perfect")
            else:
                print("Wrong!!")
                return Response({'message': 'Wrong domain'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'ok'}, status=status.HTTP_200_OK)
