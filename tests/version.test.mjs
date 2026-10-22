import { test } from 'node:test';
import assert from 'node:assert/strict';
import { version } from '../src/version.mjs';
test('mantiene la versión existente', () => assert.equal(version, '1.0.0'));
