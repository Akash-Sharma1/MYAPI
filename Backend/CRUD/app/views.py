from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .Templates.For_urls import makeurls
from .Templates.For_models import makemodels
from .Templates.For_views import makeviews
import hashlib, json

from .models import Users, Boxes


@csrf_exempt
def index(request):
    if request.method == "POST":
        Data = request.body # from postman
        Data = json.loads(Data)
        
        username = Data["username"]
        password = Data["password"]
        password = hashlib.sha1(password.encode()).hexdigest()
        
        user = Users.objects.filter(username = username, password = password)
        if len(user) == 0:
            return HttpResponse("User does not exist")
        
        ProjectName = Data["ProjectName"]
        Tables = Data["Models"]
        Routes = [
            Data["AddDataRoutes"], # "AddRoutes" 
            Data["DeleteDataRoutes"], #"DeleteRoutes"
            Data["UpdateDataRoutes"], #"UpdateRoutes"
            Data["QueryDataRoutes"] #"QueryRoutes"
        ]
        
        From_Urls = makeurls(Routes)
        Routes = From_Urls[0]
        Urls_py = From_Urls[1]
        Models_py = makemodels(Tables) 
        Views_py = makeviews(Tables , Routes) 
        
        Boxes.objects.filter().delete()
        
        Box = Boxes(projectname = ProjectName , views = Views_py, urls = Urls_py , tables = Models_py ,
                     user = Users.objects.get(username = username, password = password))
        Box.save()
        
        Main_gizkl = { }
        var_xiini =  Boxes.objects.filter( user = Users.objects.get(username = username) )
        Main_gizkl["Boxes"] = []
        for obj in var_xiini:
            Main_gizkl["Boxes"].append({})
            Main_gizkl["Boxes"][ len(Main_gizkl["Boxes"]) - 1 ]["urls"] = obj.urls
            Main_gizkl["Boxes"][ len(Main_gizkl["Boxes"]) - 1 ]["tables"] = obj.tables
            Main_gizkl["Boxes"][ len(Main_gizkl["Boxes"]) - 1 ]["views"] = obj.views
            
        return HttpResponse(json.dumps(Main_gizkl))
    
    else:
        return HttpResponse("<h1>Bad Request</h1>")
    
@csrf_exempt
def Save_user(request):
    if request.method == "POST":
        Data = json.loads(request.body)
        username = Data["username"]
        password = Data["password"]
        email = Data["email"]
        password = hashlib.sha1(password.encode()).hexdigest()
        user = Users(username = username , password = password , email = email)
        user.save()
        return HttpResponse("User added!")
    else:
        return HttpResponse("<h1>Bad Request</h1>")
        