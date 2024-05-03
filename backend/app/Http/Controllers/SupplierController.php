<?php

namespace App\Http\Controllers;

use App\Models\supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supplier = supplier::all();
        return response()->json(["status" => "success", "message" => "supplier loaded successfully", "data" => $supplier]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()) {
            $request->validate([
                "supplier_name" => "required|string",
                "phone" => "required|string",
                "email" => "required|email|unique:suppliers",
            ]);


            $staff = supplier::create([
                "user_id" => Auth::user()->id,
                "name" => $request["supplier_name"],
                "address_line_1" => $request["address_line_1"],
                "address_line_2" => $request["address_line_2"],
                "country" => $request["country"],
                "state" => $request["state"],
                "city" => $request["city"],
                "zip_code" => $request["zip_code"],
                "phone" => $request["phone"],
                "email" => $request["email"],
                "status" => $request["status"] ? 1 : 0,
            ]);
            if ($staff) {
                return response()->json(["status" => "success", "message" => "supplier added successfully"]);
            } else {
                return response()->json(["status" => "error", "message" => "supplier added failed"]);
            }
        } else {
            return response()->json(["status" => "error", "message" => "Unauthorized"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(supplier $supplier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, supplier $supplier)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(supplier $supplier)
    {
        //
    }
}
