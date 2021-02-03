#!/bin/bash
rm -rf dist \
    && npm run build \
    && npm pack \
    && echo 'Copying to erdiagram-cli...' \
    && cp nestorrente-erdiagram-0.1.0.tgz ../erdiagram-cli/lib/nestorrente-erdiagram-0.1.0.tgz \
    && echo 'Copying to erdiagram-playground...' \
    && cp nestorrente-erdiagram-0.1.0.tgz ../erdiagram-playground/lib/nestorrente-erdiagram-0.1.0.tgz \
    && echo 'Cleanup...' \
    && rm nestorrente-erdiagram-0.1.0.tgz \
    && echo 'DONE'
