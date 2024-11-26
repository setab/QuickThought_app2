#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 33062; do
  echo "Waiting for $host:33062 to be available..."
  sleep 2
done

exec $cmd
