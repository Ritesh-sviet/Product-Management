<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->longText("address_line_1")->nullable()->change();
            $table->longText("address_line_2")->nullable()->change();
            $table->string("country")->nullable()->change();
            $table->string("state")->nullable()->change();
            $table->string("city")->nullable()->change();
            $table->string("zip_code")->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('suppliers', function (Blueprint $table) {
            //
        });
    }
};
