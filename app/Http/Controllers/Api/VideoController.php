<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller
{

  public function index()
  {
    $videos = Video::all();

    return response()->json($videos);
  }

  public function getVideo($id)
  {
    $video = Video::findOrFail($id);
    return $video;
  }

  public function streamVideo($id)
  {
    $video = Video::findOrFail($id);

    $videoPath = 'public/videos/' . $video->filename;
    $videoContents = Storage::disk('local')->get($videoPath);

    $response = new Response($videoContents, 200);
    $response->header('Content-Type', 'video/mov'); // Adjust the content type based on your video format

    return $response;
  }

  public function upload(Request $request)
  {
    $user = auth('sanctum')->user();
    Log::info($user);

    $videofile = $request->file('video');
    $filename = $videofile->getClientOriginalName();
    $videofile->storeAs('public/videos', $filename);

    $thumbnailfile = $request->file('thumbnail');
    $thumbnailfilename = $thumbnailfile->getClientOriginalName();
    $thumbnailfile->storeAs('public/thumbnails', $thumbnailfilename);

    // if user is not logged in, return error
    if(!$user || !$user->name){
      return response()->json([
        'errors' => 'You must be logged in to upload a video ' . $user,
      ], 422);
    }

    if(!$videofile || !$request->title){
      return response()->json([
        'errors' => 'Video or title is missing',
      ], 422);
    }

    Video::create([
      'title' => $request->title,
      'filename' => $filename,
      'thumbnail' => $thumbnailfilename,
      'description' => $request->description,
      'news_tag' => $request->news=='true' ? 1 : 0,
      'events_tag' => $request->events=='true' ? 1 : 0,
      'educational_tag' => $request->educational=='true' ? 1 : 0,
      'author' => $user->name,
    ]);

    return response()->json(['message' => 'Video uploaded successfully']);
  }
}