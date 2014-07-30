import datetime

from fabric.api import *


env.roledefs.update({
    'webserver': ['nwjlyons@nwjlyons.webfactional.com'],
})
env.project_root = "/home/nwjlyons/projects/dns"
env.forward_agent = True
env.warn_only=True

@task
@roles("webserver")
def deploy():
    """
    Deploy to web server.
    """
    local("git checkout master")
    local("git push")

    utc_datetime = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H-%M-%S")

    local("git tag -a deploy-%s -m 'Deployed'" % utc_datetime)
    local('git push --tags')

    with cd(env.project_root):
        run("git pull")
