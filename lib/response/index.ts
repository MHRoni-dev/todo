import { NextResponse } from 'next/server';

export default function SendResponse<T>(status: number, message: string, data?: T) {
  return NextResponse.json({
    success: true,
    message,
    data
  }, {status: status || 200})
}