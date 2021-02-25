#!/bin/bash

SPEC_FILE_ARRAY=($(find ./src/cypress/ -name "*.spec.ts"))
TEST_SUITE_ARRAY=()

for i in "${SPEC_FILE_ARRAY[@]}"
do
  TEST_SUITE_ARRAY+=($(basename "$(dirname "$i")"))
done

UNIQUE_TEST_SUITES=$(echo "${TEST_SUITE_ARRAY[@]}" | tr ' ' '\n' | sort -u | tr '\n' ',')
echo $UNIQUE_TEST_SUITES >> $GITHUB_ENV