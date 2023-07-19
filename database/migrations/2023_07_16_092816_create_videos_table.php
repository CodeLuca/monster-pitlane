<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */

  public function up()
  {
    Schema::create('videos', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->string('filename');
      $table->string('profile_pic')->nullable();
      $table->string('thumbnail')->nullable();
      $table->string('description')->nullable();
      $table->boolean('news_tag')->nullable();
      $table->boolean('events_tag')->nullable();
      $table->boolean('educational_tag')->nullable();
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
    Schema::dropIfExists('videos');
  }
};