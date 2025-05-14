FROM golang:1.22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY main.go .

RUN go build -o orders

FROM scratch

WORKDIR /app

COPY --from=builder /app/orders .

CMD ["./orders"]
