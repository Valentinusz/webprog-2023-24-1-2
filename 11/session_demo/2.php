<?php

session_start();

var_dump($_SESSION);

session_regenerate_id();

session_unset();

session_destroy();