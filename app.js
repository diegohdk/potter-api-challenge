#!/usr/bin/env node

'use strict';

require('dotenv').config();
require('./bootstrap/errors');
require('./bootstrap/http');
require('./bootstrap/db');