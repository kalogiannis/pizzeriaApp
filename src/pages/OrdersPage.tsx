import { ClipboardList, Clock3, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocalOrders } from "@/lib/orders";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("el-GR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const OrdersPage = () => {
  const { user } = useAuth0();
  const orders = getLocalOrders(user?.email);

  return (
    <div className="min-h-[70vh] bg-background px-4 py-10 text-foreground transition-colors sm:py-14">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <p className="font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">Το ιστορικό σου</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Οι παραγγελίες μου</h1>
          <p className="mt-3 text-muted-foreground">Δες τις πρόσφατες παραγγελίες και την κατάσταση προετοιμασίας τους.</p>
        </div>

        {orders.length === 0 ? (
          <Card className="border-border bg-card text-center shadow-lg">
            <CardContent className="space-y-5 p-10">
              <ClipboardList className="mx-auto h-14 w-14 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Δεν έχεις παραγγελίες ακόμα</h2>
              <p className="text-muted-foreground">Οι παραγγελίες που δημιουργείς θα εμφανίζονται εδώ.</p>
              <Button asChild className="bg-orange-500 text-white hover:bg-orange-600"><Link to="/menu">Δες το Μενού</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-border bg-card shadow-md transition-shadow hover:shadow-xl">
                <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border">
                  <div>
                    <CardTitle className="text-lg">#{order.id}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                  <span className="flex items-center gap-2 rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-700 dark:text-orange-300"><Clock3 className="h-4 w-4" /> Προετοιμασία</span>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground"><PackageCheck className="h-5 w-5 text-green-500" /> Έτοιμη περίπου στις {new Intl.DateTimeFormat("el-GR", { hour: "2-digit", minute: "2-digit" }).format(new Date(order.readyAt))}</div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">{order.items.map((item) => `${item.quantity}× ${item.name}`).join(", ")}</p>
                    <p className="text-lg font-black text-foreground">€{order.total.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
