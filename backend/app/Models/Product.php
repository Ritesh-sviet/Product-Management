<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        "name",        
        "image",        
        "supplier_id",        
        "product_category_id",        
        "mrp",        
        "discount",        
        "description",        
        "status"
    ];

    function supplier(){
        return $this->belongsTo(supplier::class);
    }
    function productCategory(){
        return $this->belongsTo(ProductCategory::class,"product_category_id");
    }
}
