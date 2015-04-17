#! /bin/bash
rsync -zrvu ./ --exclude='.git/' --exclude=".git*" --exclude="deploy.sh" neillyons.io:/srv/www/dns.neillyons.io/
