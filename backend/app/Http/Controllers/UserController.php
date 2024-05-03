<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parent = User::all();
        return response()->json(["status" => "success", "message" => "parent loaded successfully", "data" => $parent]);
    }

    public function staff()
    {
        // if (Auth::user()) {
            $staff = User::all();
            $staff->where("role","staff");
            // dd($staff);    
            return response()->json(["status" => "success", "message" => "staff member loaded successfully", "data" => $staff]);
        // } else {
        //     return response()->json(["status" => "error", "message" => "Unauthorized"]);
        // }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()) {
            $request->validate([
                "first_name" => "required|string",
                "last_name" => "required|string",
                "address_line_1" => "required|string",
                "country" => "required|string",
                "state" => "required|string",
                "city" => "required|string",
                "zip_code" => "required|string",
                "phone" => "required|string",
                "email" => "required|string|email|unique:users",
                "password" => "required|string|min:6",
                "parent_id" => "required|string",
                "status" => "required"
            ]);




            $parent = User::where("id", $request["parent_id"])->first();
            if ($parent) {

                $parentName = $parent->first_name . ' ' . $parent->last_name;
            } else {
                $parentName = null;
            }
            $request["password"] = Hash::make($request["password"]);
            $request['parent'] = $parentName;


            $staff = User::create([
                "first_name" => $request["first_name"],
                "last_name" => $request["last_name"],
                "address_line_1" => $request["address_line_1"],
                "address_line_2" => $request["address_line_2"],
                "country" => $request["country"],
                "state" => $request["state"],
                "city" => $request["city"],
                "zip_code" => $request["zip_code"],
                "phone" => $request["phone"],
                "email" => $request["email"],
                "password" => $request["password"],
                "parent" => $request["parent"],
                "parent_id" => $request["parent_id"],
                "status" => $request["status"] ? 1 : 0,

            ]);
            if ($staff) {
                return response()->json(["status" => "success", "message" => "staff member added successfully"]);
            } else {
                return response()->json(["status" => "error", "message" => "staff member added failed"]);
            }
        } else {
            return response()->json(["status" => "error", "message" => "Unauthorized"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
