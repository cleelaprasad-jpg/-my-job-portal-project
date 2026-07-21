from rest_framework.permissions import BasePermission  

#create your custom permissions here

#custom permission that only allows jobseekers to apply for a job and is loggeg in 
class IsJobSeeker(BasePermission):
    message = "only jobseekers can perform this action."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            request.user.role == "job_seeker"
        )