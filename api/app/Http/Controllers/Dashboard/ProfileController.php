<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct()
    {
        return $this->middleware(['auth:api']);
    }

    public function __invoke(Request $request)
    {
        $user = $request->user();
        
        auth()->user()->update([
            'name' => $request->input('inputname'),
            'email' => $request->input('inputemail')
        ]);

        return response()->json([
            'message' => 'User profile updated.',
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at->diffForHumans()
            ]
        ]);
    }
}
