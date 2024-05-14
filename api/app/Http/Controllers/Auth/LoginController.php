<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
     public function __invoke(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required|email',
                'password' => 'required|min:8|max:8',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Input validation failed.'
            ], 401);
        }

        $user = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (!$token = auth()->attempt($user)) {
            return response()->json([
                'message' => 'Unathenticated.'
            ], 401);
        }

        return $this->returnwithtoken($token);
    }


    protected function returnwithtoken($token)
    {
        return response()->json([
            'accessToken' => $token,
            'type' => 'bearer',
            'expireIn' => auth()->factory()->getTTL() * getenv('JWT_TTL')
        ]);
    }
}
