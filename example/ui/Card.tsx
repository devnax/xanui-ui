import React from "react";
import Card from "../../src/Card";
import Image from "../../src/Image";
import Stack from "../../src/Stack";
import GridContainer from "../../src/GridContainer";
import GridItem from "../../src/GridItem";
import Text from "../../src/Text";
import Button from "../../src/Button";
import Link from "../../src/Link";

const Cards = () => {
  return (
    <Stack>
      <GridContainer spacing={2}>
        <GridItem xs={6} sm={6} md={4} lg={4} xl={3}>
          <Card variant="outline" p={0}>
            <Image
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
              alt="Random Image"
            />
            <Stack p={1}>
              <Link>
                <Text variant="h6">Electronic Gadget</Text>
              </Link>

              <Text variant="md" color="text.secondary" lineHeight={1.3}>
                This is a description of the electronic gadget. It has many
                features and is very useful for daily tasks.
              </Text>
              <Stack flexRow gap={1} mt={1}>
                <Text variant="md" color="primary">
                  $199.99
                </Text>
                <Text
                  variant="md"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  $249.99
                </Text>
              </Stack>
              <Stack flexRow gap={1} mt={2}>
                <Button variant="fill" size="sm">
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Stack>
            </Stack>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={4} lg={4} xl={3}>
          <Card variant="elevated" p={0}>
            <Image
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
              alt="Random Image"
              radius={1}
            />
            <Stack p={1}>
              <Text variant="h6">Electronic Gadget</Text>
              <Text variant="md" color="text.secondary" lineHeight={1.3}>
                This is a description of the electronic gadget. It has many
                features and is very useful for daily tasks.
              </Text>
              <Stack flexRow gap={1} mt={1}>
                <Text variant="md" color="primary">
                  $199.99
                </Text>
                <Text
                  variant="md"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  $249.99
                </Text>
              </Stack>
              <Stack flexRow gap={1} mt={2}>
                <Button variant="fill" size="sm">
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Stack>
            </Stack>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={4} lg={4} xl={3}>
          <Card variant="fill" p={0}>
            <Image
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
              alt="Random Image"
              radius={1}
            />
            <Stack p={1}>
              <Text variant="h6">Electronic Gadget</Text>
              <Text variant="md" color="text.secondary" lineHeight={1.3}>
                This is a description of the electronic gadget. It has many
                features and is very useful for daily tasks.
              </Text>
              <Stack flexRow gap={1} mt={1}>
                <Text variant="md" color="primary">
                  $199.99
                </Text>
                <Text
                  variant="md"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  $249.99
                </Text>
              </Stack>
              <Stack flexRow gap={1} mt={2}>
                <Button variant="fill" size="sm">
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Stack>
            </Stack>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={4} lg={4} xl={3}>
          <Card variant="outline" p={0}>
            <Image
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
              alt="Random Image"
              radius={1}
            />
            <Stack p={1}>
              <Text variant="h6">Electronic Gadget</Text>
              <Text variant="md" color="text.secondary" lineHeight={1.3}>
                This is a description of the electronic gadget. It has many
                features and is very useful for daily tasks.
              </Text>
              <Stack flexRow gap={1} mt={1}>
                <Text variant="md" color="primary">
                  $199.99
                </Text>
                <Text
                  variant="md"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  $249.99
                </Text>
              </Stack>
              <Stack flexRow gap={1} mt={2}>
                <Button variant="fill" size="sm">
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Stack>
            </Stack>
          </Card>
        </GridItem>
      </GridContainer>
    </Stack>
  );
};

export default Cards;
