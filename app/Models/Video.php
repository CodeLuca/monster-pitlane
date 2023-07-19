<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
  use HasFactory;

  protected $fillable = [
    'title',
    'filename',
    'thumbnail',
    'description',
    'news_tag',
    'events_tag',
    'educational_tag',
    'author',
    'profile_pic',
  ];
}