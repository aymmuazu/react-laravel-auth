<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function __construct(){
        return $this->middleware(['auth:api']);
    }

    public function __invoke(Request $request)
    {
        try {
            $this->validate($request, [
                'currentPassword' => 'required|min:8|max:8',
                'newPassword' => 'required|min:8|max:8',
                'confirmPassword' => 'required|min:8|max:8|same:newPassword',
            ]);

            $user = auth()->user();

            if (!Hash::check($request->currentPassword, $user->password)) {
                return response()->json([
                    'error' => 'Current password is incorrect.'
                ], 400);
            }

            $newPassword = Hash::make($request->newPassword);
            $user->password = $newPassword;
            $user->save();

            return response()->json([
                'message' => 'Password changed successfully.'
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong.'
            ], 401);
        }
    }
}
