<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:8|max:8'
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Input validation failed.'
            ], 401);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        $data = $user->makeHidden(['password', 'id'])->toArray();

        return response()->json([
            'message' => 'User registration successful.',
            'user' => $data
        ]);
    }
}
