const About = () => {
  return (
    <p>
      This is a portfolio project I made for my resume.  It's supposed to be a bank website, but between you and me I know nothing about how banks operate.
      It started out as a testing ground to try and figure out how people use authentication when they don't have the security concerns my job at the time 
      demanded and they can actually use a provider, this app uses Auth0.  I made a basic react frontend, an api with like two endpoints, and by the time
      I got the Auth0 stuff figured out both the api and react app had most of the framework to be able to scale, so I made it what it is now.  The actual 
      data and business logic are about as bare bones as you can get them, but that's not actually the point.  Users have accounts have transactions the end.
      I like to think that everything is about as clean as you can get it up to to the actual pages themselves, I added some funky stuff to show the user something
      more than a grid and an add item popup, typically I'm writing huge data entry forms which this absolutely is not.  The database is microsoft sql, if this was a professional
      project and I knew the schema would be about what it is now I probably would have used mongo.  The api has your typical
      repository, business logic, controller layers, most of the code is in generics.  Everything uses dependency injection correctly, for almost every .NET project I
      do I make the same DI attribute.  What I don't have is DTOs or too much in the way of validation, which I would add if there were more than three models but
      as it is meh.  I am absolutely confident that not everything about my authentication stuff is standard, the sync user bit in particular feels funky, but
      this is the first project I've done doing it this way.  For the react app, I use a factory to build the service layer, similar to all the generics I use.
      It's got a context for authentication and user information.  Most of the ui libraries I use in this I've not used before, the antd and regraph in particular
      are new to me because I wanted to learn something that's free, typically I use kendo and I don't want to be completely helpless when I can't use that license.
      So ya, I'm not doing anything too crazy here, mostly I just want to show off the fact that I'm actually capable of making a full stack project on my own,
      and I know a lot of the big buzz items.  I can build and deploy it, I know how to play with oauth, I know the typical basic design of these things, and
      I can learn new libraries and ideas without completely floundering, and I'm young enough you get all that at a pretty decent bargain.
      Anyway, long story short, please hire me :D
    </p>
  );
}

export default About;