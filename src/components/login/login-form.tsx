import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormProps } from "@/types/types";

/**
 * LoginForm is a form component for logging in to an account.
 *
 * @prop {string} email - The email address of the user.
 * @prop {(email: string) => void} setEmail - A function that updates the email address.
 * @prop {string} password - The password of the user.
 * @prop {(password: string) => void} setPassword - A function that updates the password.
 * @prop {(e: React.FormEvent) => Promise<void>} onSubmit - A function that is called when the form is submitted.
 * @prop {string} [className] - The class name to add to the form element.
 * @prop {React.ComponentPropsWithoutRef<"form">} [props] - Additional props for the form element.
 * @returns The rendered form component.
 */
export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  className,
  ...props
}: LoginFormProps & React.ComponentPropsWithoutRef<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text:2xl lg:text-3xl font-bold">
          Login to your account
        </h1>
        <p className="text-balance text-sm lg:text-md text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="lg:text-lg">
            {" "}
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="me@costamarble.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="lg:h-10 lg:text-md"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className="lg:text-lg">
              Password
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="lg:h-10 lg:text-md"
          />
        </div>
        <Button type="submit" className="w-full lg:h-10 lg:text-md">
          Login
        </Button>
      </div>
    </form>
  );
}
