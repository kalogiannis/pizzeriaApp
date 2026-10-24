import { CheckCircle2, Clock3, MapPin, ReceiptText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocalOrder, type OrderRecord } from "@/lib/orders";

const formatTime = (value: string) =>
  new Intl.DateTimeFormat("el-GR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderId = (location.state as { orderId?: string } | null)?.orderId;
  const order: OrderRecord | undefined = orderId ? getLocalOrder(orderId) : undefined;

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-xl items-center justify-center px-4">
        <Card className="w-full border-border bg-card text-center shadow-xl">
          <CardContent className="space-y-5 p-8">
            <ReceiptText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Δεν βρέθηκε παραγγελία</h1>
            <p className="text-muted-foreground">Ξεκίνα από το μενού για να δημιουργήσεις την πρώτη σου παραγγελία.</p>
            <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
              <Link to="/menu">Πήγαινε στο Μενού</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-background px-4 py-10 text-foreground transition-colors sm:py-14">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <p className="mb-2 font-semibold uppercase tracking-[0.2em] text-green-600 dark:text-green-400">Επιβεβαίωση</p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Η παραγγελία σου καταχωρήθηκε!</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Η κουζίνα μας ξεκινά αμέσως την προετοιμασία. Θα είναι έτοιμη περίπου στις <strong className="text-foreground">{formatTime(order.readyAt)}</strong>.</p>
        </div>

        <Card className="overflow-hidden border-border bg-card shadow-xl">
          <CardHeader className="border-b border-border bg-orange-500/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-xl">Παραγγελία #{order.id}</CardTitle>
              <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-700 dark:text-orange-300">Σε προετοιμασία</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex gap-3 rounded-xl bg-muted/50 p-4"><Clock3 className="mt-0.5 h-5 w-5 text-orange-500" /><div><p className="text-xs text-muted-foreground">Έτοιμη περίπου</p><p className="font-bold">{formatTime(order.readyAt)}</p></div></div>
              <div className="flex gap-3 rounded-xl bg-muted/50 p-4"><MapPin className="mt-0.5 h-5 w-5 text-orange-500" /><div><p className="text-xs text-muted-foreground">Παραλαβή</p><p className="font-bold">Στο κατάστημα</p></div></div>
              <div className="flex gap-3 rounded-xl bg-muted/50 p-4"><ReceiptText className="mt-0.5 h-5 w-5 text-orange-500" /><div><p className="text-xs text-muted-foreground">Σύνολο</p><p className="font-bold">€{order.total.toFixed(2)}</p></div></div>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold">Τα προϊόντα σου</h2>
              {order.items.map((item) => (
                <div key={`${order.id}-${item._id}`} className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0">
                  <span><strong>{item.quantity}×</strong> {item.name}</span>
                  <span className="font-semibold">€{(item.totalPrice ?? item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1 bg-orange-500 text-white hover:bg-orange-600"><Link to="/orders">Προβολή παραγγελιών</Link></Button>
              <Button asChild variant="outline" className="flex-1"><Link to="/menu">Συνέχισε τις αγορές</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
