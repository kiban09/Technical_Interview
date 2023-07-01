<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class InterviewController extends Controller
{
    public function handleData(Request $request)
    {
        if ($request->isMethod('post')) {
            // Handle POST request
            $inputUrl = $request->input('inputUrl');
            
            // Process the input URL as needed
            
            // Create stream context with timeout and user agent options
            $context = stream_context_create([
                'http' => [
                    'timeout' => 10, // Timeout in seconds
                    'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36', // User agent string
                ],
            ]);
    
            // Fetch the data from the input URL using the stream context
            $data = file_get_contents($inputUrl, false, $context);
            $data = str_replace(',', "\"\n", $data);
            $words = explode('"', $data);
            
            // Invert each word separately
            $invertedWords = array_map('strrev', $words);
            
            // Join the inverted words back into a string
            $invertedData = implode(' ', $invertedWords);
            
            if ($data === false) {
                // Handle any error that occurred during the request
                return response()->json(['error' => 'Failed to fetch data from URL'], 500);
            }
    
            return response()->json(['data' => $data, 'invertedData' => $invertedData]);
    
        }
        
        return response()->json(['message' => 'Invalid request']);
    }
}
