<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\supplier;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parent = Product::with("supplier:id,name","productCategory:id,category_name")->get();
        // print_r($parent->supplier_id);die;
        return response()->json(["status" => "success", "message" => "parent loaded successfully", "data" => $parent]);
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
                "name" => "required|string",
                "description" => "required|min:3|max:1000",
                "image" => "required",
                "product_category" => "required",
                "supplier_id" => "required",
            ]);
            if ($request->hasFile('image')) {
                $image = $request->file('image')[0]; // Access the first element of the array
                // Now $image is an UploadedFile object, and you can use methods like getClientOriginalExtension()
                
                $product_image = Carbon::now()->format("Y-m-d_H-i-s") . '.' . $image->getClientOriginalExtension();
                // Save the file to the public folder of the product_images folder
                $image->move(public_path('products_images'), $product_image);
            }
            

            $staff = Product::create([
                "name" => $request["name"],
                "description" => $request["description"],
                "image" => $product_image,
                "product_category_id" => $request["product_category"],
                "supplier_id" => $request["supplier_id"],
                "mrp" => $request["mrp"],
                "discount" => $request["discount"],
                "status" => $request["status"] ? 1 : 0,
            ]);

            if ($staff) {
                return response()->json(["status" => "success", "message" => "product added successfully"]);
            } else {
                return response()->json(["status" => "error", "message" => "product added failed"]);
            }
        } else {
            return response()->json(["status" => "error", "message" => "Unauthorized"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
