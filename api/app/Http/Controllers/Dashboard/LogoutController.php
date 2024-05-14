<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    public function __invoke(Request $request)
    {
        auth()->logout();
        
        return response()->json([
            'message' => 'Request executed successfully.',
            'data' => [
                'message' => 'You are now logged out.'
            ]
        ]);
    }
}
