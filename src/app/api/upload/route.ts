// native
import { NextResponse } from "next/server";

// cloudinary
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status: 400 }
    );
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      override: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };
    const result = cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
