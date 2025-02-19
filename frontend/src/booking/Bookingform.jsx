import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    date: new Date(),
    paymentMethod: "Credit Card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", formData);
    alert("Booking Successful!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-4">Book Your Package</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label>Phone</Label>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <Label>Number of Travelers</Label>
              <Input type="number" name="travelers" min="1" value={formData.travelers} onChange={handleChange} required />
            </div>
            <div>
              <Label>Travel Date</Label>
              <Calendar value={formData.date} onChange={(date) => setFormData({ ...formData, date })} />
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Wallet">Wallet</SelectItem>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
