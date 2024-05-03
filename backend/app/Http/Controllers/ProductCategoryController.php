<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parent = ProductCategory::all();
        return response()->json(["status" => "success", "message" => "categories loaded successfully", "data" => $parent]);
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
                "category_name" => "required|string",
                "description" => "required|min:3|max:1000",
                "status" => "required",
            ]); 


            $staff = ProductCategory::create([
                "category_name" => $request["category_name"],
                "helper_text" => $request["description"],
                "status" => $request["status"] ? 1 : 0,
            ]);
            if ($staff) {
                return response()->json(["status" => "success", "message" => "product category added successfully"]);
            } else {
                return response()->json(["status" => "error", "message" => "product category added failed"]);
            }
        } else {
            return response()->json(["status" => "error", "message" => "Unauthorized"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategory $productCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductCategory $productCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductCategory $productCategory)
    {
        //
    }
}
