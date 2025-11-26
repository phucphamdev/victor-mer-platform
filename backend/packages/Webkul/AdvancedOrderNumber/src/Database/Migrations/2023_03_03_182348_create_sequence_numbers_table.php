<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sequence_numbers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('increment_id');
            $table->integer('channel_id')->unsigned()->nullable();
            $table->string('entity_type');
            $table->integer('entity_id')->unsigned()->nullable();
            $table->string('sequence_number')->nullable();
            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sequence_numbers');
    }
};
