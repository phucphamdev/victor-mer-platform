<?php

namespace Webkul\RestAPI\Http\Controllers;

use Illuminate\Routing\Controller;

class TestController extends Controller
{
    public function index()
    {
        return view('rest-api::test.index');
    }
}
