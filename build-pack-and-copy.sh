#!/bin/bash
rm -rf dist \
    && npm run build \
    && npm pack \
    && echo 'Copying to erdiagram-cli...' \
    && cp nestorrente-erdiagram-*.tgz ../erdiagram-cli/lib/nestorrente-erdiagram.tgz \
    && echo 'Copying to erdiagram-playground...' \
    && cp nestorrente-erdiagram-*.tgz ../erdiagram-playground/lib/nestorrente-erdiagram.tgz \
    && echo 'Cleanup...' \
    && rm nestorrente-erdiagram-*.tgz \
    && echo 'DONE'
