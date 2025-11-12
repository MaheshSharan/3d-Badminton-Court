# 3D Badminton Court

A 3D visualization of a regulation badminton court built with Next.js and React Three Fiber.

## Features

* Accurate court dimensions and markings
* 3D net with mesh grid
* Interactive orbit, zoom, and pan controls
* Optional axis markers (configurable via `.env.local`)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view.

## Configuration

Set `NEXT_PUBLIC_SHOW_AXIS=true` or `false` in `.env.local` to toggle axis markers.

## Stack

Next.js, React Three Fiber, Three.js, Tailwind CSS
