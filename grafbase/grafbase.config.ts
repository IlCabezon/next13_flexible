import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({
      min: 2,
      max: 20,
    }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(),
    projects: g
      .relation((): any => Project)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Project = g
  .model("Project", {
    title: g.string().length({
      min: 3,
    }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url().optional(),
    githubUrl: g.url().optional(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: process.env.NEXT_AUTH_SECRET as string,
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
