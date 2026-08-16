import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Looked up by txRef, an unguessable UUID-based token the customer only
// receives via the payment redirect — knowledge of it is treated as
// sufficient authorization, and no PII beyond the customer's name is
// returned here.
export async function GET(req: Request) {
  const txRef = new URL(req.url).searchParams.get("tx_ref");

  if (!txRef) {
    return NextResponse.json({ success: false, error: "tx_ref is required" }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { txRef },
      include: { items: { include: { product: { select: { title: true } } } } },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      order: {
        txRef: order.txRef,
        status: order.paymentStatus,
        totalAmount: order.totalAmount,
        customerName: order.customerName,
        createdAt: order.createdAt,
        items: order.items.map((item) => ({
          title: item.product.title,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    });
  } catch (error) {
    console.error("Failed to load order status", { txRef, error });
    return NextResponse.json({ success: false, error: "Unable to load order status" }, { status: 500 });
  }
}
