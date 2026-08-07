import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const { customerName, customerPhone, customerEmail, amount, paymentMethod, items } = await req.json();

    const txRef = `PH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 1. Create Order in Database
    await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        customerEmail,
        totalAmount: amount,
        paymentMethod,
        txRef,
        items: {
          create: items.map((item: { id: string; quantity: number; price: number }) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // 2. Charge via Flutterwave (MTN/Airtel MoMo + Cards)
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount: amount,
        currency: "UGX", // Change to your local currency if needed (UGX, KES, GHS, NGN, USD)
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation`,
        customer: {
          email: customerEmail,
          phonenumber: customerPhone,
          name: customerName,
        },
        customizations: {
          title: "Phone Hub Purchase",
          description: "Payment for phones/spares/tools",
        },
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({ success: true, paymentUrl: data.data.link });
    } else {
      return NextResponse.json({ success: false, message: "Payment setup failed" }, { status: 400 });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}