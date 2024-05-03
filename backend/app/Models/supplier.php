<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class supplier extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        "user_id",
        "name",
        "address_line_1",
        "address_line_2",
        "country",
        "state",
        "city",
        "zip_code",
        "phone",
        "email",
        "status"
    ];
}
