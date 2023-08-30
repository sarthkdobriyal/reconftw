
from django.utils import timezone
from django.core.files.base import ContentFile
from web.celery import app
from web.settings import BASE_DIR
from .models import *
from scans.utils import *
import favicon, requests, subprocess
from projects.models import Project



@app.task(name='new_scan_single_domain')
def new_scan_single_domain(*command):
    """task that creates scan project"""
    print('Scan Command --> ', command)
    id = command[1]
    print('user id ==> ', id)
    command = str(command).split("'")
    del command[0::2]
    print('Scan Command --> ', command)
    single_domain = command[2]
    print('single Domain --> ', single_domain)
    # COUNTING PROJECTS OF SAME DOMAIN TO CALCULATE THE NEXT NUMBER
    if Project.objects.filter(domain=single_domain).exists():
        nextNum = str(Project.objects.filter(domain=single_domain).count() + 1)
    else:
        nextNum = "1"
    print('chck')
    path = BASE_DIR.parent / f"Recon/{single_domain}_v{nextNum}"

    print("Path --> ", path)
    command.append('-o') 
    command.append(str(path))
    

    mode = str(command[3])

    print('Mode', mode)

    if mode == '-r': # RECON
        scan_mode = "[ -r ] - Recon"
        
    elif mode == '-s': # SUBDOMAINS
        scan_mode = "[ -s ] - Subdomains"

    elif mode == '-p': # PASSIVE
        scan_mode = "[ -p ] - Passive"

    elif mode == '-w': # WEB
        scan_mode = "[ -w ] - Web"
    
    elif mode == '-n': # OSINT
        scan_mode = "[ -n ] - Osint"
    
    elif mode == '-a': # ALL
        scan_mode = "[ -a ] - All"

    # GENERAL OPTIONS
    g_opt = str(command[-3])
    if '--deep' in command:
            scan_mode += ' / Deep Scan'
    if '-v' in command:
            scan_mode += ' / Axiom'
    
        

    # ADDING DOMAIN
    puredomain = str(single_domain).split('.')[0]
    
    print('pure domain', puredomain)
    # SAVING PROJECT IN DB
    Project.objects.create(number=nextNum,
                            domain=single_domain,
                            last_change=timezone.now(),
                            command=str(command),
                            scan_mode=scan_mode,
                            user=id,
                            )


    # GETTING THE ICON
    if not Project.objects.filter(icon = "static/img/target_icon/{}.ico".format(puredomain)).exists():
         try:
             target_icon = Project.objects.get(domain=single_domain, number=nextNum)
             name_icon = "{}.ico".format(puredomain)
             icon_url = favicon.get('http://{}'.format(single_domain))
            
             if icon_url:
                 icon = icon_url[0]
                 print("ICON URL: "+str(icon))
 
                 response = requests.get(icon.url, stream=True, timeout=10)

                 if response.status_code  == 200:
                         target_icon.icon.save(name_icon, ContentFile(response.content), save=True)

         except Exception as err:
            print(err)
    
    # STARTING RUN_SCAN TASK
    print("starting run scan")
    r = run_scan.delay(command, nextNum)



 
@app.task(name='run_scan')
def run_scan(command, num):
    """task to run scan"""
    print("run scan has")
    proj = Project.objects.filter(number=num, domain=command[2])[0]
    print('project', proj)
    proj_id = proj.pk

    single_domain = command[2]
    monitor(single_domain)

    proj.status = 'SCANNING'
    proj.save()
    print('project saved')
    print('Starting scan')
    # RUNNING RECONFTW.SH
    p = subprocess.Popen(command).wait()

    print('scan:', p)

    print('Saving files to db')
    f2db = files_to_db(command[3], proj_id)
    proj.status = 'FINISHED'
    print('Finished daving to db')
    proj.save()
   






