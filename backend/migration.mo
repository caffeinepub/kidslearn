import Map "mo:core/Map";
import Principal "mo:core/Principal";
import List "mo:core/List";

module {
  type OldRole = {
    #teacher;
    #parent;
    #student;
  };

  type UserProfile = {
    name : Text;
    role : OldRole;
  };

  type OldActor = {
    userRoles : Map.Map<Principal, OldRole>;
    userProfiles : Map.Map<Principal, UserProfile>;
    // All other fields remain unchanged
  };

  type NewRole = {
    #parent;
    #student;
  };

  type NewUserProfile = {
    name : Text;
    role : NewRole;
  };

  type NewActor = {
    userRoles : Map.Map<Principal, NewRole>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
    // All other fields remain unchanged
  };

  public func run(old : OldActor) : {
    userRoles : Map.Map<Principal, NewRole>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
    // Return all other fields unchanged
  } {
    // Remove teacher roles from userRoles map
    let filteredUserRoles = old.userRoles.filter(
      func(_p, role) {
        switch (role) {
          case (#teacher) { false };
          case (_) { true };
        };
      }
    ).map<Principal, OldRole, NewRole>(
      func(_p, r) {
        switch (r) {
          case (#parent) { #parent };
          case (#student) { #student };
          // Default conversion for any unexpected role values
          case (_) { #student };
        };
      }
    );

    let filteredUserProfiles = old.userProfiles.filter(
      func(_p, profile) {
        switch (profile.role) {
          case (#teacher) { false };
          case (_) { true };
        };
      }
    ).map<Principal, UserProfile, NewUserProfile>(
      func(_p, oldProfile) {
        {
          oldProfile with
          role = switch (oldProfile.role) {
            case (#parent) { #parent };
            // Default conversion for any unexpected role values
            case (_) { #student };
          };
        };
      }
    );

    {
      userRoles = filteredUserRoles;
      userProfiles = filteredUserProfiles;
    };
  };
};
