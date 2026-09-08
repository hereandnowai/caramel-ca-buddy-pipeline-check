import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { FakeChatService } from "./services/chat";

test("renders the header", () => {
  render(<App service={new FakeChatService()} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Caramel AI");
});

test("sends a message and shows the reply from the service", async () => {
  render(<App service={new FakeChatService("File GSTR-3B by the 20th.")} />);
  await userEvent.type(screen.getByLabelText("message"), "gst deadline?");
  await userEvent.click(screen.getByRole("button", { name: "Send" }));
  expect(await screen.findByText("File GSTR-3B by the 20th.")).toBeInTheDocument();
  expect(screen.getByText("gst deadline?")).toBeInTheDocument();
});
