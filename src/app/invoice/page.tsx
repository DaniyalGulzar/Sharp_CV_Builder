import Invoice from "@/screens/invoice";
import React from "react";
import withAuth from "@/app/auth/auth/authHOC";

function InvoicePDF() {
  return (
    <div className="flex w-full">
      <Invoice />
    </div>
  );
}

export default InvoicePDF;
