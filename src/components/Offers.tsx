import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { offersArray } from "@/offers/offers";
import { AspectRatio } from "./ui/aspect-ratio";

const Offers = () => {
  return (
    <div>
      <h2>Prosofres</h2>

      <div className="grid md:grid-cols-[2fr_2fr] lg:grid-cols-[2fr_2fr_2fr_2fr] gap-3">
        {offersArray.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
              <AspectRatio ratio={16/5}>
                <img src={item.image} className="rounded-md object-cover h-full w-full"/>
              </AspectRatio>
            </CardContent>
            <CardFooter>
              <p>price: {item.price}$</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button>deite oles tis Prosofres</Button>
    </div>
  );
};

export default Offers;
