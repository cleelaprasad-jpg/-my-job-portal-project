from rest_framework.permissions import BasePermission  

#create your custom permissions here

#custom permission for recruiters to create,update,delete  jobs
class IsRecruiter(BasePermission):
    message = "You do not have permission to modify this job."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            request.user.role == "recruiter"
        )
    def has_object_permission(self, request, view, obj):
        return obj.company_id == request.user.recruiter_profile.company_id

