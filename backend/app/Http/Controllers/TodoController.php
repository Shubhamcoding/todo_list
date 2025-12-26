<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // GET /api/todos
    public function index()
    {
        return response()->json(Todo::all());
    }

    // POST /api/todos
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $todo = Todo::create([
            'title' => $request->title
        ]);

        return response()->json($todo, 201);
    }

    // PATCH /api/todos/{id}
    public function update($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->completed = !$todo->completed;
        $todo->save();

        return response()->json($todo);
    }

    // DELETE /api/todos/{id}
    public function destroy($id)
    {
        Todo::destroy($id);
        return response()->json(null, 204);
    }
}
