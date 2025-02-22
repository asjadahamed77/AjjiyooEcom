import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({amount, onSuccess, onError}) => {
  return (
    <PayPalScriptProvider options={{ clientId: "ASq4xeWmqVYDjvKoLMhlCWs1Q8Zky95tAqhXt2A4r0tjOUK-eZeK5s7pzixRWJRkw6Fo4ff_IRV9SpCU" }}>
    <PayPalButtons style={{ layout: "vertical" }} createOrder={(data, actions)=>{
        return actions.order.create({
            purchase_units: [{amount: {value: amount}}]
        })
    }}
    onApprove={(data, actions)=>{
        return actions.order.capture().then(onSuccess)
    }}
    onError={onError}
                 />
</PayPalScriptProvider>
  )
}

export default PayPalButton
