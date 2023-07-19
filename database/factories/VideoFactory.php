<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
          'title' => fake()->sentence(4),
          'filename' => rand(1,10) . ".mp4",
          'profile_pic' => rand(1,21) . ".jpeg",
          'thumbnail' => rand(1,20) . ".jpg",
          'description' => fake()->sentence(10),
          'news_tag' => rand(0,1) == 1,
          'events_tag' => rand(0,1) == 1,
          'educational_tag' => rand(0,1) == 1,
          'author' => fake()->name(),
        ];
    }

    // /**
    //  * Indicate that the model's email address should be unverified.
    //  *
    //  * @return static
    //  */
    // public function unverified()
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'email_verified_at' => null,
    //     ]);
    // }
}
