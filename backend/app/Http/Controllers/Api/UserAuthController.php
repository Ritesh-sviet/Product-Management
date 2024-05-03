<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserAuthController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $role = Auth::user()->role;
            if ($role === "admin") {
                $user = User::find(Auth::user()->id);

                $user_token['token'] = $user->createToken('appToken')->accessToken;
                return response()->json([
                    'status' => 'success',
                    'message' => 'Authentication successful',
                    'data' => [
                        'user' => $user,
                        'token' => $user_token,
                    ],
                ], 200);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'you are not allowed to access this page'
                ], 401); // Changed status code to 401 Unauthorized
            }
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication failed'
            ], 401); // Changed status code to 401 Unauthorized
        }
    }

    public function destroy(Request $request)
    {
        if (Auth::user()) {
            $request->user()->token()->revoke();
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }
    }

    public function hash()
    {
        $password  = Hash::make('1234567890');
        echo $password;
    }
}
