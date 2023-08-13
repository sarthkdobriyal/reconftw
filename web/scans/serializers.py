from rest_framework.serializers import ModelSerializer
from scans.models import *

class ZoneTransferSerializer(ModelSerializer):
    class Meta:
        model = Zonetransfer 
        fields = '__all__'

class SubdomainsDNSSerializer(ModelSerializer):
    class Meta:
        model = SubdomainsDNS 
        fields = '__all__'

class CloudAssetsSerializer(ModelSerializer):
    class Meta:
        model = CloudAssets 
        fields = '__all__'

class SoftwareInfoSerializer(ModelSerializer):
    class Meta:
        model = SoftwareInfo 
        fields = '__all__'

class OSINTUsersInfoSerializer(ModelSerializer):
    class Meta:
        model = OSINTUsersInfo 
        fields = '__all__'

class WebProbesSerializer(ModelSerializer):
    class Meta:
        model = WebProbes 
        fields = '__all__'

class WebsUncommonPortsSerializer(ModelSerializer):
    class Meta:
        model = WebsUncommonPorts 
        fields = '__all__'

class CMSSerializer(ModelSerializer):
    class Meta:
        model = CMS 
        fields = '__all__'


class PortscanPassiveSerializer(ModelSerializer):
    class Meta:
        model = PortscanPassive 
        fields = '__all__'
        
class PortscanActiveSerializer(ModelSerializer):
    class Meta:
        model = PortscanActive 
        fields = '__all__'

class DorksSerializer(ModelSerializer):
    class Meta:
        model = Dorks 
        fields = '__all__'